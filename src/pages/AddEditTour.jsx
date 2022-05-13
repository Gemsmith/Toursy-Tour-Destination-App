import '../sass/pages/AddEditTour.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import addIcon from '../assets/svg/add-icon.svg';
import removeIcon from '../assets/svg/remove-icon.svg';
import FileBase64 from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createNewTourThunk, updateTourThunk } from '../redux/features/tourSlice';

const AddEditTour = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector((state) => state.user);
  const { loading, usersTours } = useSelector((state) => state.tour);

  // Component States
  const [fileData, setFileData] = useState(null);

  // --------------EDIT TOUR FUNCTIONALITY START---------------------------------
  // If route url contains a editTour/:id, it means we are in edit mode.
  // But if it doesn't, it means we are in add mode, whre url becomes /addTour.
  const editTourId = useParams().id;
  // When we're in the editTour route url, we'll find currently being edited tour from "usersTours".
  // And then autofill form's fields with that tourObject's data.
  let editTourFormDataObj;

  // As soon as this component loads, we'll check to see if the tourId exists (that we got from route url).
  // If it does we'll call the resetForm() function to autofill the form with the tour's data that we're currently editing.
  useEffect(() => {
    if (editTourId) {
      const editTourObj = usersTours.find((tour) => tour._id === editTourId);
      // "editTourObj" contains many other fields, so we need only the properties that will make up the fields we need to re-fill in the form. NOTE: We won't need to destructure image, bcoz user will either be uploading a new image or keep the existing one.
      editTourFormDataObj = {
        title: editTourObj?.title,
        description: editTourObj?.description,
        tags: editTourObj?.tags,
      };
    }
    handleFormReset();
  }, [editTourId]);

  const handleFormReset = () => {
    // reset(arg) expects the arg to be same schema as the form/data object that is created on formSubmit by react-hook-form.
    // Only then can it re-fill the form's fields from the provided "arg".
    if (editTourId) {
      reset(editTourFormDataObj); // reset to editTourFormDataObj's data
      // reset({ title: 'Hello', description: 'HEllo again', tags: ['tag1', 'tag2'] }); // reset to editTourFormDataObj's data
      // console.log(editTourFormDataObj);
    } else {
      reset(); // reset all fields to empty fields
    }
  };
  // --------------EDIT TOUR FUNCTIONALITY END---------------------------------

  // --------------Form functionality START---------------------------------
  const {
    register,
    handleSubmit,
    trigger,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  // As soon as the form loads, 1 tag input should get created by default
  useEffect(() => {
    if (fields.length === 0) {
      append('');
    }
    // eslint-disable-next-line
  }, []);

  const onSubmit = (data) => {
    // Taking these out, we need to create new object with more properties than just these 3.
    const { title, description, tags } = data;
    let tourData;
    // Here "_id" is the mongoDB "_id" which is of type mongoose.ObjectID.
    if (title && description) {
      tourData = {
        ...data,
        creatorName: loggedInUser?.name,
        image: fileData,
      };
    }

    if (!editTourId) {
      dispatch(createNewTourThunk(tourData));
      // handleFormReset();
    } else {
      dispatch(updateTourThunk(editTourId, tourData));
    }
  };

  // --------------Form functionality END---------------------------------

  return (
    <section className="add__edit__tour">
      <h1 className="add__edit__tour-heading">
        {editTourId ? 'Update your tour' : 'Add your newest tour'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Tour Title  */}
        <div className="add__edit__tour-title">
          <label className="" htmlFor="title">
            Title
            {/* <span className=""> *</span> */}
          </label>
          <input
            onKeyUp={() => trigger(`title`)}
            id="title"
            type="text"
            placeholder="Ex. Statue of Liberty"
            {...register('title', {
              required: 'Required',
              minLength: { value: 3, message: 'Min. 3 characters' },
            })}
          />
          {errors?.title && (
            <small className="input-warning">{errors.title.message}</small>
          )}
        </div>

        {/* Tour Description  */}
        <div className="add__edit__tour-description">
          <label className="" htmlFor="description">
            Description
            {/* <span className=""> *</span> */}
          </label>

          <textarea
            onKeyUp={() => {
              trigger(`description`);
            }}
            id="description"
            rows={5}
            placeholder="Enter a description for this location"
            {...register('description', {
              required: 'Required',
              minLength: { value: 3, message: 'Min. 3 characters' },
            })}
          ></textarea>
          {errors?.description && (
            <small className="input-warning">{errors.description.message}</small>
          )}
        </div>

        {/* Tour Tags  */}
        <div className="add__edit__tour-tags">
          <div className="tags__container-labelRow">
            <label className="" htmlFor="tags">
              Tags
              {/* <span className=""> *</span> */}
            </label>

            <button className="svg-icons" type="button" onClick={() => append('')}>
              <img src={addIcon} alt="" />
            </button>
          </div>

          <div className="tags__container-inputs">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="tags__container-inputs-input">
                  <Controller
                    render={({ field }) => (
                      <input
                        onKeyUp={() => {
                          trigger(`tag.${index}`);
                        }}
                        id={`tag-${index}`}
                        placeholder="Enter a tag"
                        className={`input-tag__item   
                      `}
                        {...field}
                      />
                    )}
                    name={`tags.${index}`}
                    control={control}
                    defaultValue={field.tag}
                    rules={{
                      required: 'Required',
                    }}
                  />
                  {errors.tags?.[index] && (
                    <small className="input-warning">{errors.tags[index].message}</small>
                  )}

                  <button
                    className="input-removeBtn"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <img src={removeIcon} alt="" className="svg-icons" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Image Upload */}
        {/* Had quite a bit of difficulty getting this working, found out it is a isuue with file uploads with react-hook-form. So could use the example from below:
        https://github.com/react-hook-form/react-hook-form/discussions/5394#discussioncomment-848215
        https://codesandbox.io/s/long-sun-nsfbk?file=/src/App.js:950-993
           */}
        {/* But for now I am just creating a FileBase tag that will add the base64 to a state variable, and I'll just attach that to the form data created by react-hook-form before uploading to server */}
        <div className="add__edit__tour-imageUpload">
          <FileBase64
            id="file"
            className="file-input"
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setFileData(base64);
            }}
          />

          {/* <FileBase64
            id="file"
            className="file-input"
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setTourData({ ...tourData, imageBase64: base64 });
            }}
            {...register('file')}
          /> */}

          {/* <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <FileBase64
                id="file"
                className="file-input"
                type="file"
                multiple={false}
                onDone={({ base64 }) => {
                  setTourData({ ...tourData, imageBase64: base64 });
                }}
                {...register('file')}
              />
            )}
          /> */}
        </div>

        <div className="add__edit__tour-form-buttons">
          {/* Save Button */}
          <button type="submit" className="saveBtn">
            {editTourId ? 'Update Tour' : 'Create Tour'}
          </button>

          {/* Reset/Clear Button */}
          <button type="clear" className="clearBtn" onClick={handleFormReset}>
            Clear
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddEditTour;
