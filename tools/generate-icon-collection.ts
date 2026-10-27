import { promises as fs } from 'node:fs'
import { importDirectory } from '@iconify/tools'

const iconsDir = './app/assets/images/icons'
const outputFile = `${iconsDir}/collection.json`

const collection = await importDirectory(
  iconsDir,
  {
    prefix: 'app',
  },
)

const output = collection.export()

await fs.writeFile(
  outputFile,
  JSON.stringify(output, null, 2),
)

/* eslint-disable no-console */
console.info('✅ Icons generated')
