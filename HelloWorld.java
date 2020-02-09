public class HelloWorld {

    public static void main(String[] args) {
        // Prints "Hello, World" to the terminal window.
        System.out.println("Hello, World");
String myString = null;

System.out.println("Equal? " + myString.equals("foo"));                        // Noncompliant; will raise a NPE
System.out.println("Equal? " + (myString != null && myString.equals("foo")));  // Noncompliant; null check could be removed
        System.out.println("Hello, World");
        }

}
