export function bodyValidator(body: any, fields: any) {
    const keys = body;
  
    for (let key in keys) {
      if (fields.findIndex((i: any) => i === key) === -1) {
        return false;
      }
    }
    return true;
  }