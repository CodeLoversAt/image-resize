# image-resize
little package to do image resizing and optimization with gulp

## Installation

```shell
git clone https://github.com/CodeLoversAt/image-resize.git
cd image-resize
npm install
```

## Usage

Put the files you want to resize into to the `original` folder. Then run gulp. All options show below the default value and are optional.

```shell
gulp --width=1200 \
    --height=0 \
    --crop=true \
    --upscale=false \
    --optimizationLevel=5 \
    --progressive=true \
    --interlaced=true
```
