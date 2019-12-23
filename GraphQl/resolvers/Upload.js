const {
  AuthenticationError,
  UserInputError,
  withFilter
} = require("apollo-server");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { CLOUD_NAME } = require("../../config");
const { API_KEY } = require("../../config");
const { API_SECRET } = require("../../config");
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

const User = require("../../models/User");

const checkAuth = require("../../util/CheckAuth");

module.exports = {
  Mutation: {
    async setProfilePicture(_, { url }, context) {
      const user = checkAuth(context);
      const currentUser = await User.findById(user.id);
      try {
        currentUser.profilePicture = await url;
        await currentUser.save();
        return currentUser;
      } catch (error) {}
    },
    async uploadFile(_, { file }, context) {
      const user = checkAuth(context);
      // console.log(user.id);
      let url = "";
      console.log(file);
      function setUrl(link) {
        url = link;
        return true;
      }
      const { createReadStream, filename } = await file;
      const currentUser = await User.findById(user.id);

      try {
        console.log(filename);

        const result = await new Promise((resolve, reject) => {
          createReadStream().pipe(
            cloudinary.uploader.upload_stream(
              { tags: "basic_sample" },
              (error, result) => {
                if (error) {
                  reject(error);
                }

                resolve(result);
              }
            )
          );
        });
        console.log(result);
        await currentUser.photos.push({ url: result.url });
        await currentUser.save();

        return currentUser;
        // const photo = await cloudinary.uploader.upload(file.filename);
        // createReadStream()
        //   .pipe()
        //   .cloudinary.uploader.upload_stream({ tags: "basic_sample" }, function(
        //     err,
        //     image
        //   ) {
        //     console.log();
        //     console.log("** Stream Upload");
        //     if (err) {
        //       console.warn(err);
        //     }
        //     console.log("* Same image, uploaded via stream");
        //     console.log("* " + image.public_id);
        //     console.log("* " + image.url);
        //     url = image.url;
        //     setUrl(url);
        //     currentUser.photos.push({ url: image.url });
        //     currentUser.save();
        //   });

        // await createReadStream().pipe(upload_stream);
        console.log(currentUser);
        return currentUser;
        console.log("hit");
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
