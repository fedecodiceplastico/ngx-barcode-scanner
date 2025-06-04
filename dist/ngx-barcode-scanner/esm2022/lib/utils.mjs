export class Utils {
    /* eslint-disable */
    static setOrDefault(object, path, value) {
        if (typeof object[path] === 'undefined') {
            object[path] = value;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9uZ3gtYmFyY29kZS1zY2FubmVyL3NyYy9saWIvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLEtBQUs7SUFDaEIsb0JBQW9CO0lBQ3BCLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBVyxFQUFFLElBQVksRUFBRSxLQUFVO1FBQ3ZELElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVyxFQUFFO1lBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDdEI7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVXRpbHMge1xuICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICBzdGF0aWMgc2V0T3JEZWZhdWx0KG9iamVjdDogYW55LCBwYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIG9iamVjdFtwYXRoXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG9iamVjdFtwYXRoXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufVxuIl19