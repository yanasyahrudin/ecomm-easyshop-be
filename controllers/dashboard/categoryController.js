const { responseReturn } = require("../../utiles/response");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const categoryModel = require("../../models/categoryModel");

class categoryControllers {
  add_category = async (req, res) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        responseReturn(res, 404, { error: "Something Went Wrong" });
      } else {
        let { name } = fields;
        let { image } = files;
        name = name.trim();
        const slug = name.split(" ").join("-");

        cloudinary.config({
          cloud_name: process.env.cloud_name,
          api_key: process.env.api_key,
          api_secret: process.env.api_secret,
          secure: true,
        });

        try {
          const result = await cloudinary.uploader.upload(image.filepath, {
            folder: "categorys",
          });
          if (result) {
            const category = await categoryModel.create({
              name, slug, image: result.url
            })
            responseReturn(res, 201, { category, message: "Category Added Successfully" });
          } else {
            responseReturn(res, 404, { error: "Image Upload File" });
          }
        } catch (error) {
          responseReturn(res, 500, { error: "Internet Server Error" });

        }
      }
    });
  };
  get_category = async (req, res) => {
    console.log("this is working");
  };
}

module.exports = new categoryControllers();
