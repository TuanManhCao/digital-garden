## Volglass
Volglass is a fork of [MindStone(digital-garden)](https://github.com/TuanManhCao/digital-garden)

It is this project's goal to be a free open-source alternative solution to [Obsidian Publish](https://obsidian.md/publish)

Volglass documentation is build my self!!

https://volglass.turtton.net

# Features

- **Search** documents
- **Dark** Theme

Also, I fixed many issues that the original has.

## Getting started
### Run on your local machine

Steps to run it on your local machine:
1. `npm init --yes`
2. `npm install --save-dev volglass-cli`
3. `npx volglass init`
4. Put in your vault contents in `posts` directory.
5. `npx volglass serve`
6. Open this link in your browser http://localhost:3000/ 

### Publish your page

See [volglass-docs repository](https://github.com/turtton/volglass-docs) for an example.

## Future development 

- Embed markdown/image rendering
- Tag list view

## For developers
Instead of cloning this repository, I recommend to use [volglass-cli](https://github.com/turtton/volglass-cli).

1. `npm init --yes`
2. `npm install --save-dev volglass-cli`
3. `npx volglass dev --use-ssh -T`

Now, volglass-cli does these tasks
- clone this repository(with ssh`--use-ssh`) to dev directory
- download template page contents(`-T`)
- run `next dev`

Please run `npx volglass dev` after the second time.
