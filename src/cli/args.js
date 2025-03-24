const parseArgs = () => {
    const args = process.argv.slice(2); // Убираем первые два элемента (node и путь до файла)
    const result = [];
  
    for (let i = 0; i < args.length; i += 2) {
      const propName = args[i].replace('--', ''); // Убираем префикс "--"
      const propValue = args[i + 1];
      result.push(`${propName} is ${propValue}`);
    }
  
    console.log(result.join(', '));
  };
  
  parseArgs();
  