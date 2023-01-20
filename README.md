## Volglass
Volglass is a fork of [MindStone(digital-garden)](https://github.com/TuanManhCao/digital-garden) but many codes replaced to typescript.

It is this project's goal to be a free open-source alternative solution to [Obsidian Publish](https://obsidian.md/publish)

## Getting started
### Run on your local machine

Steps to run it on your local machine:
1. Clone this [Github repo](https://github.com/turtton/volglass)
2. Install [pnpm](https://pnpm.io/installation) package manager 
3. Copy all of your **markdown** file (`.md` only) and folder to `/posts/` **except** `/posts/index.md` file
4. Copy all of your images from your Obsidian Vault to `/public/images/` folder 
5. Go to root folder of your project, run `pnpm i && pnpm run dev`
6. Open this link in your browser http://localhost:3000/ 

## Future development 

- Embed markdown/image rendering
- Text search
- Tag list view

I also plan to create a CLI application for easy environment building and updating.