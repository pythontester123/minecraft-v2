// Après l'empaquetage Windows : pose l'icône et les informations de version sur « Minecraft V2.exe ».
// (Fait en JavaScript avec resedit, pour pouvoir fabriquer l'application depuis Linux sans Wine.)
const fs = require('fs');
const path = require('path');
const ResEdit = require('resedit');

exports.default = async function afterPack(ctx) {
  if (ctx.electronPlatformName !== 'win32') return;
  const info = ctx.packager.appInfo;
  const exe = path.join(ctx.appOutDir, info.productFilename + '.exe');
  const exeData = ResEdit.NtExecutable.from(fs.readFileSync(exe), { ignoreCert: true });
  const res = ResEdit.NtExecutableResource.from(exeData);
  const ico = ResEdit.Data.IconFile.from(fs.readFileSync(path.join(ctx.packager.info.projectDir, 'build', 'icon.ico')));
  const groups = ResEdit.Resource.IconGroupEntry.fromEntries(res.entries);
  const groupId = groups.length ? groups[0].id : 1, lang = groups.length ? groups[0].lang : 1033;
  ResEdit.Resource.IconGroupEntry.replaceIconsForResource(res.entries, groupId, lang, ico.icons.map(i => i.data));
  const vi = ResEdit.Resource.VersionInfo.fromEntries(res.entries)[0] || ResEdit.Resource.VersionInfo.createEmpty();
  const [a, b, c] = info.version.split('.').map(n => parseInt(n, 10) || 0);
  vi.setFileVersion(a, b, c, 0, 1033); vi.setProductVersion(a, b, c, 0, 1033);
  for (const lng of vi.getAllLanguagesForStringValues()) {
    vi.setStringValues(lng, {
      FileDescription: info.productName, ProductName: info.productName, CompanyName: info.companyName || 'pythontester123',
      InternalName: info.productName, OriginalFilename: info.productFilename + '.exe', LegalCopyright: info.copyright || '',
      FileVersion: info.version, ProductVersion: info.version,
    });
  }
  vi.outputToResourceEntries(res.entries);
  res.outputResource(exeData);
  fs.writeFileSync(exe, Buffer.from(exeData.generate()));
  console.log('  • icône et version posées sur ' + path.basename(exe));
};
