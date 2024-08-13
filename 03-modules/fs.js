const fs = require('fs/promises')
const fsSync = require('fs')
const path = require('path')

const pathLogs = path.join(__dirname, 'logs')

const getContent = () => `${process.argv[2] ?? ''}\n`

const start = async () => {
  try {
    if (fsSync.existsSync(pathLogs)) {
      await fs.appendFile(path.join(pathLogs, './logs.txt'), getContent())
      const data = await fs.readFile(path.join(pathLogs, './logs.txt'), { encoding: 'utf-8' })
      console.log(data)
    } else {
      await fs.mkdir(pathLogs)
      await fs.writeFile(path.join(pathLogs, './logs.txt'), getContent())
      console.log('folder created')
    }
  } catch (err) {
    console.log('Error', err)
  }
}

start()
