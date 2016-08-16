// /*eslint-disable*/
//
// describe('HandleUsersInput service', () => {
//   let handleUsersInput;
//
//   beforeEach(angular.mock.module('ytVimeoApp'));
//
//   beforeEach(inject($injector => {
//     handleUsersInput = $injector.get('HandleUsersInput');
//   }));
//
//   it('should have functions getIDs, isVimeo, cutID', () => {
//     expect(handleUsersInput.getIDs).toBeDefined();
//     expect(handleUsersInput.isVimeo).toBeDefined();
//     expect(handleUsersInput.cutID).toBeDefined();
//   });
//
//   it('should have a function that checks if link is vimeo ', () => {
//     const links = ['https://www.youtube.com/watch?v=TLNfE0zLfaA', 'https://vimeo.com/23285699'];
//     const vimeoLink = handleUsersInput.isVimeo(links[1]);
//     const youtubeLink = handleUsersInput.isVimeo(links[0]);
//     dump(links, vimeoLink, youtubeLink);
//     expect(vimeoLink).toBe(true);
//     expect(youtubeLink).toBe(false);
//   });
//
// });
