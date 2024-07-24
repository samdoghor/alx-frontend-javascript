import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  const signUpUserPromise = signUpUser(firstName, lastName);
  const uploadPhotoPromise = uploadPhoto(fileName);

  return Promise.allSettled([signUpUserPromise, uploadPhotoPromise]).then((values) => {
    const result = [];
    values.forEach((element) => {
      if (element.status === 'fulfilled') {
        result.push({ status: element.status, value: element.value });
      } else {
        result.push({ status: element.status, value: `${element.reason}` });
      }
    });
    return result;
  });
}

// import signUpUser from './4-user-promise';
// import uploadPhoto from './5-photo-reject';

// export default function handleProfileSignup(firstName, lastName, fileName) {
//   return Promise.allSettled([
//     signUpUser(firstName, lastName),
//     uploadPhoto(fileName),
//   ]).then((values) => {
//     const arr = [];
//     for (const item of values) {
//       arr.push({ status: item.status, value: item.value || item.reason });
//     }
//     return arr;
//   });
// }
