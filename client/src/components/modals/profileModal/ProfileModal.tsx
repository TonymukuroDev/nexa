import React from 'react'
import { IProfileModalProps } from './type/profileModal.props'
import { useForm } from 'react-hook-form';
import { profileFormSchema, TProfileFormData } from './type/profileModal.entities';
import { zodResolver } from '@hookform/resolvers/zod';
import FormError from '../../errors/form_error/FormError';

import './ProfileModal.css'


const ProfileModal: React.FC<IProfileModalProps> = ({
  profileModal, 
  authUser, 
  setUserProfile, 
  setUserProfileLoading
}) => {

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: {errors, touchedFields, isValid}
  } = useForm<TProfileFormData>({
    mode: 'onChange',
    defaultValues: {
      username: "@nexa",
      bio: "I am using nexa"
    },
    resolver: zodResolver(profileFormSchema)
  })

  const [username, bio] = watch(["username", "bio"])
  
  const onSubmit = handleSubmit(async (data: TProfileFormData) => {
    console.log("Profile form data", data);

    try {
      // Save user profile
      console.log(data);
      
      await setUserProfile(data) 
      reset()
    } catch (error) {
      console.log(error);
      
    }
    
  })
  
  if(!profileModal.isOpen) return null;

  return (
    <div className="profileModal">
      <div className="modal">
        <div className="head">
          <div className="process">
            <span className="welcome">Welcome to Nexa</span>
            <span className='user'>{authUser?.firstName}</span> 
          </div>
          <div className="message">Final step before starting</div>
        </div>

        <div className="body">
          <form onSubmit={onSubmit}>
            <div className={`field ${username ? "filled" : ""}`}>
              <input
              {...register("username")}
              id="username" type="text" 
              />
              <label htmlFor="username">Username</label>
            </div>
            {touchedFields.username && errors.username ? <FormError message={errors.username.message as string}/> : null}

            <div className={`field ${bio ? "filled" : ""}`}>
              <input
              {...register("bio")}
              id="bio" 
              type="text" />
              <label htmlFor="bio">Bio</label>
            </div>

            <input disabled={!isValid} className="btn" type="submit" value={setUserProfileLoading ? "Loading..." : "Save" } />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal