const Path = require('node:path')
const FileSystem = require('node:fs')
const Chalk = require('chalk')
const compileTs = require('./private/tsc')

async function buildRenderer() {
  const { build } = await import('vite')
  return build({
    configFile: Path.join(__dirname, '..', 'vite.config.mjs'),
    base: './',
    mode: 'production',
  })
}

function buildMain() {
  const mainPath = Path.join(__dirname, '..', 'src', 'main')
  FileSystem.cpSync(
    Path.join(__dirname, '..', 'src', 'main', 'static'),
    Path.join(__dirname, '..', 'build', 'main', 'static'),
    { recursive: true },
  )
  return compileTs(mainPath)
}

FileSystem.rmSync(Path.join(__dirname, '..', 'build'), {
  recursive: true,
  force: true,
})

console.log(Chalk.blueBright('Transpiling renderer & main...'))

Promise.allSettled([
  buildRenderer(),
  buildMain(),
]).then(() => {
  console.log(Chalk.greenBright('Renderer & main successfully transpiled! (ready to be built with electron-builder)'))
})
