# Sons synthétisés pour Minecraft V2 (domaine public, CC0) : crocs d'évocateur, totem d'immortalité, cor de raid
import math, random, struct, wave, sys
OUT=sys.argv[1]; SR=44100
def save(name,smp):
    peak=max(1e-9,max(abs(v) for v in smp)); w=wave.open(OUT+'/'+name+'.wav','wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(b''.join(struct.pack('<h',int(max(-1,min(1,v/peak*0.92))*32767)) for v in smp)); w.close()
rnd=random.Random(34)
def env(t,a,d,s,r,dur):
    if t<a: return t/a
    if t<a+d: return 1-(1-s)*(t-a)/d
    if t<dur-r: return s
    return max(0.0,s*(dur-t)/r)
# crocs : deux claquements secs (bruit filtré + choc grave), avec un grincement d'os
def fangs():
    n=int(SR*0.42); out=[0.0]*n; lp=0.0
    for hit,t0,g in [(0,0.0,1.0),(1,0.13,0.8)]:
        for i in range(int(SR*0.16)):
            t=i/SR; k=int((t0)*SR)+i
            if k>=n: break
            e=math.exp(-t*38); x=rnd.uniform(-1,1); lp+=0.35*(x-lp)
            thump=math.sin(2*math.pi*(140-260*t)*t)*math.exp(-t*30)
            crack=(x-lp)*e*1.2
            out[k]+=g*(crack+0.8*thump)
    for i in range(n):
        t=i/SR
        if 0.05<t<0.3: out[i]+=0.15*math.sin(2*math.pi*(900+400*math.sin(t*60))*t)*math.exp(-(t-0.05)*12)
    return out
# totem : arpège ascendant brillant (do mi sol do), partiels inharmoniques légers, longue traîne
def totem():
    dur=1.9; n=int(SR*dur); out=[0.0]*n
    notes=[(523.25,0.0),(659.25,0.09),(783.99,0.18),(1046.5,0.27),(1318.5,0.36)]
    for f,t0 in notes:
        for i in range(int((dur-t0)*SR)):
            t=i/SR; k=int(t0*SR)+i
            e=math.exp(-t*2.6)*min(1,t/0.004)
            v=math.sin(2*math.pi*f*t)+0.35*math.sin(2*math.pi*f*2.01*t)*math.exp(-t*4)+0.18*math.sin(2*math.pi*f*3.02*t)*math.exp(-t*6)
            out[k]+=0.5*e*v
    for i in range(n):
        t=i/SR; out[i]+=0.08*rnd.uniform(-1,1)*math.exp(-t*3)*(0.5+0.5*math.sin(t*90))
    # écho
    d=int(SR*0.11)
    for i in range(d,n): out[i]+=0.32*out[i-d]
    return out
# cor de raid : cor grave (fondamentale 98 Hz, harmoniques de cuivre), attaque lente, vibrato, souffle
def horn():
    dur=4.2; n=int(SR*dur); out=[0.0]*n; ph=0.0; lp=0.0
    for i in range(n):
        t=i/SR; f=98*(1+0.004*math.sin(2*math.pi*5.2*t))*(1+0.03*min(1,t/0.25)-0.03)
        ph+=2*math.pi*f/SR
        e=env(t,0.35,0.4,0.85,1.2,dur)
        bright=0.6+0.4*min(1,t/0.6)
        v=sum((1/h**1.15)*math.sin(h*ph)*(bright if h>3 else 1) for h in range(1,13))
        x=rnd.uniform(-1,1); lp+=0.05*(x-lp); breath=lp*0.6*e
        out[i]=e*v*0.5+breath
    d=int(SR*0.19)
    for i in range(d,n): out[i]+=0.25*out[i-d]
    return out
save('fangs',fangs()); save('totem',totem()); save('raid_horn',horn()); print('ok')
