# Generates public/backgrounds/hero-sky.webp source (numpy + Pillow): python3 scripts/gen-sky.py 3 sky.png, then save as WebP quality 88.
import numpy as np, sys
from PIL import Image, ImageFilter
rng=np.random.default_rng(int(sys.argv[1]) if len(sys.argv)>1 else 7)
PADX,PADY=240,160
W,H=2560+2*PADX,1600+2*PADY

def noise(sx,sy):
    gw,gh=int(W/sx)+3,int(H/sy)+3
    g=rng.random((gh,gw)).astype(np.float32)
    im=Image.fromarray((g*255).astype(np.uint8)).resize((int(gw*sx),int(gh*sy)),Image.BICUBIC)
    a=np.asarray(im,dtype=np.float32)/255
    ox,oy=rng.integers(0,int(sx)),rng.integers(0,int(sy))
    return a[oy:oy+H,ox:ox+W]

def fbm(sx,sy,oct=6,gain=0.5):
    t=np.zeros((H,W),np.float32); amp=1; tot=0
    for i in range(oct):
        t+=amp*noise(sx/(2**i),sy/(2**i)); tot+=amp; amp*=gain
    return t/tot

def warp(img,dx,dy,amt):
    yy,xx=np.mgrid[0:H,0:W].astype(np.float32)
    x=np.clip(xx+(dx-0.5)*amt,0,W-1.001); y=np.clip(yy+(dy-0.5)*amt,0,H-1.001)
    x0=x.astype(int); y0=y.astype(int); fx=x-x0; fy=y-y0
    return (img[y0,x0]*(1-fx)*(1-fy)+img[y0,x0+1]*fx*(1-fy)+img[y0+1,x0]*(1-fx)*fy+img[y0+1,x0+1]*fx*fy)

yy=np.linspace(0,1,H,dtype=np.float32)[:,None]*np.ones((1,W),np.float32)
xx=np.linspace(0,1,W,dtype=np.float32)[None,:]*np.ones((H,1),np.float32)
xx=(xx*W-PADX)/(W-2*PADX); yy=(yy*H-PADY)/(H-2*PADY)

# --- sky gradient (deep blue top, pale horizon haze) ---
top=np.array([46,128,206],np.float32); mid=np.array([96,165,224],np.float32); hor=np.array([178,214,242],np.float32)
t=yy[...,None]
sky=np.where(t<0.55, top+(mid-top)*(t/0.55), mid+(hor-mid)*np.clip((t-0.55)/0.45,0,1)**1.3)
# soft sun-side glow (upper left, as the lighting)
glow=np.exp(-(((xx-0.18)/0.5)**2+((yy-0.05)/0.45)**2))[...,None]
sky=sky+glow*np.array([14,12,8],np.float32)

# --- cumulus layer ---
base=fbm(520,300,7,0.52)
wx=fbm(700,420,4); wy=fbm(700,420,4)
base=warp(base,wx,wy,260)
# coverage varies: more clouds mid-lower, clear patches up top
cover=0.50+0.10*(yy-0.5)+0.10*(fbm(1400,900,2)-0.5)
clear=np.exp(-(((xx-0.5)/0.30)**2+((yy-0.24)/0.22)**2))
cover=cover+0.20*clear
dens=np.clip((base-cover)/0.30,0,1)
dens=dens*dens*(3-2*dens)
# billowy detail
det=fbm(120,90,4)
dens=np.clip(dens*(0.78+0.5*det),0,1)

# --- thin wispy layer (cirrus), stretched horizontally, mostly upper half ---
cir=fbm(1500,160,6,0.55); cir=warp(cir,fbm(900,300,3),fbm(900,300,3),160)
wisp=np.clip((cir-0.52)/0.25,0,1)*np.clip(1.2-yy*1.5,0,1)*0.55

# --- lighting: light from upper-left; brighter where density falls off toward light ---
d=Image.fromarray((dens*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(14))
d=np.asarray(d,np.float32)/255
sh=np.roll(np.roll(d,-30,axis=0),-30,axis=1)  # sample toward lower-right
lit=np.clip(1.0-(sh-d)*3.6,0,1.2)             # edges facing light brighter
thick=np.clip(dens*1.1,0,1)
shade=0.74+0.26*np.clip(lit,0,1)
under=np.clip(yy*0.20+(1-lit)*0.30,0,0.55)    # slightly bluer-grey underside
cloud_rgb=np.stack([np.full((H,W),255,np.float32)*shade,
                    np.full((H,W),255,np.float32)*shade,
                    np.full((H,W),255,np.float32)*(shade+0.02)],-1)
cloud_rgb=cloud_rgb*(1-under[...,None])+np.array([170,194,222],np.float32)*under[...,None]
# thick cores a touch greyer, edges bright and soft
core=np.clip((dens-0.55)/0.45,0,1)[...,None]
cloud_rgb=cloud_rgb*(1-0.10*core)+np.array([205,220,238],np.float32)*(0.10*core)
alpha=np.clip(dens*1.05,0,1)[...,None]
out=sky*(1-alpha)+cloud_rgb*alpha
wa=wisp[...,None]
out=out*(1-wa)+np.array([246,250,255],np.float32)*wa

# horizon haze, whiter toward the bottom so it can meet the page
haze=np.clip((yy-0.62)/0.38,0,1)[...,None]**1.6
out=out*(1-0.55*haze)+np.array([232,241,250],np.float32)*(0.55*haze)

# grain + tiny blur to avoid banding
out=out*0.98+np.array([0,2,4],np.float32)
out=out+rng.normal(0,1.1,(H,W,1)).astype(np.float32)
img=Image.fromarray(np.clip(out,0,255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6)).crop((PADX,PADY,W-PADX,H-PADY))
img.save(sys.argv[2] if len(sys.argv)>2 else 'sky.png')
