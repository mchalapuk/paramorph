
import 'should';
import 'should-sinon';

declare global {
  namespace NodeJS {
    interface Global {
      window : Window;
    }
  }
}

