/* eslint @typescript-eslint/no-empty-function: [off] */
import { experimental } from '../lib';
import { unexperimental } from '../lib';

import chai from 'chai';
const { expect } = chai;
import spies from 'chai-spies';
chai.use(spies);

describe('experimental', () => {
    it('should exist', () => {
        expect(experimental).to.not.be.an('undefined');
    });
    it('should be a function', () => {
        expect(experimental).to.be.a('function');
    });
});

describe('experimental', () => {
    const sandbox = chai.spy.sandbox();
    beforeEach(() => {
        sandbox.on(console, 'warn');
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should designate class method as experimental [1]', () => {
        class MyClass {
            @experimental
            public method() {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance_1 = new MyClass();
        instance_1.method();
        instance_1.method();
        const instance_2 = new MyClass();
        instance_2.method();
        instance_2.method();
        expect(console.warn).to.have.been.called.once.with(
            '[EXPERIMENTAL] MyClass.method'
        );
    });
    it('should designate class method as experimental [2]', () => {
        class MyClass {
            @experimental()
            public method() {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance_1 = new MyClass();
        instance_1.method();
        instance_1.method();
        const instance_2 = new MyClass();
        instance_2.method();
        instance_2.method();
        expect(console.warn).to.have.been.called.once.with(
            '[EXPERIMENTAL] MyClass.method'
        );
    });
    it('should designate class method w/a message as experimental', () => {
        class MyClass {
            @experimental('a message')
            public method() {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance_1 = new MyClass();
        instance_1.method();
        instance_1.method();
        const instance_2 = new MyClass();
        instance_2.method();
        instance_2.method();
        expect(console.warn).to.have.been.called.once.with(
            '[EXPERIMENTAL] MyClass.method: a message'
        );
    });
    it('should designate class method w/a function as experimental', () => {
        class MyClass {
            @experimental((self, key) => {
                expect(self).to.be.instanceOf(MyClass);
                expect(key).to.eq('method');
                return 'a computed message';
            })
            public method() {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance_1 = new MyClass();
        instance_1.method();
        instance_1.method();
        const instance_2 = new MyClass();
        instance_2.method();
        instance_2.method();
        expect(console.warn).to.have.been.called.once.with(
            '[EXPERIMENTAL] MyClass.method: a computed message'
        );
    });
});

describe('experimental w/accessors', () => {
    const sandbox = chai.spy.sandbox();
    beforeEach(() => {
        sandbox.on(console, 'warn');
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should designate class property getter as experimental', () => {
        class MyClass {
            @experimental
            public get property() {
                expect(this).to.be.instanceOf(MyClass);
                return 0;
            }
        }
        const instance_1 = new MyClass();
        instance_1.property;
        instance_1.property;
        const instance_2 = new MyClass();
        instance_2.property;
        instance_2.property;
        expect(console.warn).to.have.been.called.once.with(
            '[EXPERIMENTAL] MyClass.property'
        );
    });
    it('should designate class property setter as experimental', () => {
        class MyClass {
            @experimental
            public set property(value: number) {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance_1 = new MyClass();
        instance_1.property = 1;
        instance_1.property = 2;
        const instance_2 = new MyClass();
        instance_2.property = 3;
        instance_2.property = 4;
        expect(console.warn).to.have.been.called.once.with(
            '[EXPERIMENTAL] MyClass.property'
        );
    });
    it('should designate class property getter (& setter) as experimental', () => {
        class MyClass {
            @experimental
            public get property() {
                expect(this).to.be.instanceOf(MyClass);
                return 0;
            }
            public set property(value: number) {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance_1 = new MyClass();
        instance_1.property;
        instance_1.property = 1;
        instance_1.property;
        instance_1.property = 2;
        const instance_2 = new MyClass();
        instance_2.property;
        instance_2.property = 3;
        instance_2.property;
        instance_2.property = 4;
        expect(console.warn).to.have.been.called.once.with(
            '[EXPERIMENTAL] MyClass.property'
        );
    });
    it('should designate class property (getter &) setter as experimental', () => {
        class MyClass {
            @experimental
            public get property() {
                expect(this).to.be.instanceOf(MyClass);
                return 0;
            }
            public set property(value: number) {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance_1 = new MyClass();
        instance_1.property;
        instance_1.property = 1;
        instance_1.property;
        instance_1.property = 2;
        const instance_2 = new MyClass();
        instance_2.property;
        instance_2.property = 3;
        instance_2.property;
        instance_2.property = 4;
        expect(console.warn).to.have.been.called.once.with(
            '[EXPERIMENTAL] MyClass.property'
        );
    });
});

describe('experimental w/static methods', () => {
    const sandbox = chai.spy.sandbox();
    beforeEach(() => {
        sandbox.on(console, 'warn');
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should designate class method as experimental', () => {
        class MyClass {
            @experimental
            public static method() {
                expect(this).to.eq(MyClass)
            }
        }
        MyClass.method();
        MyClass.method();
        expect(console.warn).to.have.been.called.once.with(
            '[EXPERIMENTAL] MyClass.method'
        );
    });
    it('should designate class method w/a message as experimental', () => {
        class MyClass {
            @experimental('a message')
            public static method() {
                expect(this).to.eq(MyClass)
            }
        }
        MyClass.method();
        MyClass.method();
        expect(console.warn).to.have.been.called.once.with(
            '[EXPERIMENTAL] MyClass.method: a message'
        );
    });
    it('should designate class method w/a function as experimental', () => {
        class MyClass {
            @experimental((self, key) => {
                expect(self).to.not.be.instanceOf(MyClass);
                expect(self).to.eq(MyClass);
                expect(key).to.eq('method');
                return 'a computed message';
            })
            public static method() {
                expect(this).to.eq(MyClass)
            }
        }
        MyClass.method();
        MyClass.method();
        expect(console.warn).to.have.been.called.once.with(
            '[EXPERIMENTAL] MyClass.method: a computed message'
        );
    });
});

describe('experimental w/static accessors', () => {
    const sandbox = chai.spy.sandbox();
    beforeEach(() => {
        sandbox.on(console, 'warn');
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should designate class property getter as experimental', () => {
        class MyClass {
            @experimental
            public static get property() {
                expect(this).to.eq(MyClass)
                return 0;
            }
        }
        MyClass.property;
        MyClass.property;
        expect(console.warn).to.have.been.called.once.with(
            '[EXPERIMENTAL] MyClass.property'
        );
    });
    it('should designate class property setter as experimental', () => {
        class MyClass {
            @experimental
            public static set property(value: number) {
                expect(this).to.eq(MyClass)
            }
        }
        MyClass.property = 1;
        MyClass.property = 2;
        expect(console.warn).to.have.been.called.once.with(
            '[EXPERIMENTAL] MyClass.property'
        );
    });
    it('should designate class property getter (& setter) as experimental', () => {
        class MyClass {
            @experimental
            public static get property() {
                expect(this).to.eq(MyClass)
                return 0;
            }
            public static set property(value: number) {
                expect(this).to.eq(MyClass)
            }
        }
        MyClass.property;
        MyClass.property = 1;
        MyClass.property;
        MyClass.property = 2;
        expect(console.warn).to.have.been.called.once.with(
            '[EXPERIMENTAL] MyClass.property'
        );
    });
    it('should designate class property (getter &) setter as experimental', () => {
        class MyClass {
            @experimental
            public static get property() {
                expect(this).to.eq(MyClass)
                return 0;
            }
            public static set property(value: number) {
                expect(this).to.eq(MyClass)
            }
        }
        MyClass.property;
        MyClass.property = 1;
        MyClass.property;
        MyClass.property = 2;
        expect(console.warn).to.have.been.called.once.with(
            '[EXPERIMENTAL] MyClass.property'
        );
    });
});

describe('unexperimental', () => {
    it('should exist', () => {
        expect(unexperimental).to.not.be.an('undefined');
    });
    it('should be a function', () => {
        expect(unexperimental).to.be.a('function');
    });
});

describe('unexperimental', () => {
    const sandbox = chai.spy.sandbox();
    beforeEach(() => {
        sandbox.on(console, 'warn');
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should invoke original class method', () => {
        class MyClass {
            @experimental
            public method() {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance = new MyClass();
        unexperimental(instance.method).bind(instance)();
        expect(console.warn).to.have.not.been.called();
    });
    it('should invoke original class method w/o a message', () => {
        class MyClass {
            @experimental('a message')
            public method() {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance = new MyClass();
        unexperimental(instance.method).bind(instance)();
        expect(console.warn).to.have.not.been.called();
    });
    it('should invoke original class method w/o a computed message', () => {
        class MyClass {
            @experimental((self, key) => {
                expect(self).to.be.instanceOf(MyClass);
                expect(key).to.eq('method');
                return 'a computed message';
            })
            public method() {
                expect(this).to.be.instanceOf(MyClass);
            }
        }
        const instance = new MyClass();
        unexperimental(instance.method).bind(instance)();
        expect(console.warn).to.have.not.been.called();
    });
});

describe('unexperimental w/static methods', () => {
    const sandbox = chai.spy.sandbox();
    beforeEach(() => {
        sandbox.on(console, 'warn');
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should invoke original class method', () => {
        class MyClass {
            @experimental
            public static method() {
                expect(this).to.not.be.instanceOf(MyClass);
                expect(this).to.eq(MyClass);
            }
        }
        unexperimental(MyClass.method).bind(MyClass)();
        expect(console.warn).to.have.not.been.called();
    });
    it('should invoke original class method w/o a message', () => {
        class MyClass {
            @experimental('a message')
            public static method() {
                expect(this).to.not.be.instanceOf(MyClass);
                expect(this).to.eq(MyClass);
            }
        }
        unexperimental(MyClass.method).bind(MyClass)();
        expect(console.warn).to.have.not.been.called();
    });
    it('should invoke original class method w/o a computed message', () => {
        class MyClass {
            @experimental((self, key) => {
                expect(self).to.not.be.instanceOf(MyClass);
                expect(self).to.eq(MyClass);
                expect(key).to.eq('method');
                return 'a computed message';
            })
            public static method() {
                expect(this).to.eq(MyClass);
            }
        }
        unexperimental(MyClass.method).bind(MyClass)();
        expect(console.warn).to.have.not.been.called();
    });
});
