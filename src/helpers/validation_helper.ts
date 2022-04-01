class ValidationHelper {
  public static email(str: string) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(str);
  }
}

export default ValidationHelper;
