/**
 * Idea from http://blog.mitsuruog.info/2015/03/writing-angularjs-using-es6.html
 */
export default class Post{

  /*@ngInject*/
  constructor($resource) {

    return $resource('/items/:id', {
      id: '@id'
    }, {
      update: {
        method: "PUT"
      },
      remove: {
        method: "DELETE"
      }
    });
  }

  /*@ngInject*/
  static createPost($resource){
    return new Post($resource);
  }

}