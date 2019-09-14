


// function identify() {
// 	console.log('1')
// 	return this.name.toUpperCase();
// }

// function speak() {
// 	console.log('2')
// 	var greeting = "Hello, I'm " + identify.call(you);
// 	console.log( greeting );
// }
// var me = {
// 	name: "Kyle"
// };

// // var you = {
// // 	name: "Reader"
// // };

// // identify.call( you ); // READER
// // speak.call( me ); // Hello, I'm KYLE

// function foo(num) {
// 	console.log( "foo: " + num );
// 	console.log(this.count, 'hdhdh')
// 	// keep track of how many times `foo` is called
// 	this.count++;
// }
// console.log(this.count, 'hdhdh')
// foo.count = 0;

// var i;

// for (i=0; i<10; i++) {
// 	if (i > 5) {
// 		foo( i );
// 	}
// }

// // how many times was `foo` called?
// console.log( foo.count ); // 0 -- WTF?




// function foo(num) {
// 	console.log( "foo: " + num );
// 	this.count++;
// }

// foo.count = 0;

// var i;

// for (i=0; i<10; i++) {
// 	if (i > 5) {
// 		// using `call(..)`, we ensure the `this`
// 		// points at the function object (`foo`) itself
// 		foo.call( foo, i );
// 	}
// }
// // foo: 6
// // foo: 7
// // foo: 8
// // foo: 9

// // how many times was `foo` called?
// console.log( foo.count ); // 4




// function foo() {
// 	var a = 2;
// 	bar();
// }

// function bar() {
// 	console.log( this.a );
// }

// foo(); //undefined


function foo() {
	console.log( a ); // 3  (not 2!)
}

function bar() {
	var a = 3;
	foo();
}

var a = 2;

bar();