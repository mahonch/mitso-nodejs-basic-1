const parseEnv = () => {
    const prefix = 'MITSO_';
    const filteredVars = Object.entries(process.env)
      .filter(([key]) => key.startsWith(prefix));
  
    if (filteredVars.length === 0) {
      console.error('No environment variables found with the prefix MITSO_. Please set the required variables.');
      return;
    }
  
    const result = filteredVars
      .map(([key, value]) => `${key}=${value}`)
      .join('; ');
  
    console.log(result);
  };
  
  parseEnv();
  