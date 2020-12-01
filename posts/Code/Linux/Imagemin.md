## Installation
```bash
npm install --global imagemin-cli
npm install -g imagemin-webp (transform to webp format)
 npm install -g imagemin-jpegoptim (lossy jpeg compression)
```

## Usage

```bash
$ imagemin --help

  Usage
    $ imagemin <path|glob> ... --out-dir=build [--plugin=<name> ...]
    $ imagemin <file> > <output>
    $ cat <file> | imagemin > <output>

  Options
    --plugin, -p   Override the default plugins
    --out-dir, -o  Output directory

  Examples
    $ imagemin images/* --out-dir=build
    $ imagemin foo.png > foo-optimized.png
    $ cat foo.png | imagemin > foo-optimized.png
    $ imagemin foo.png --plugin=pngquant > foo-optimized.png
    $ imagemin foo.png --plugin.pngquant.quality={0.1,0.2} > foo-optimized.png
    $ imagemin foo.png --plugin.webp.quality=95 --plugin.webp.preset=icon > foo-icon.webp
```
```bash
imagemin ./* --plugin.webp.quality=85   --out-dir=zip/
```
```bash
imagemin --plugin.jpegoptim.progressive=true --plugin.jpegoptim.max=70 *.jpg --out-dir=./out
# or
imagemin --plugin.jpegoptim.progressive=true --plugin.jpegoptim.max=90 ./*jpg --out-dir=./zip
```

---

## Resize 
In the image folder

```bash
mogrify -resize 1600x2400! ./*.jpg
```

