import { useContext, useState } from 'react'
import './profileUpdatePage.scss'
import { AuthContext } from '../../context/AuthContext'
import apiRequest from '../../lib/apiRequest'
import { useNavigate } from 'react-router-dom'
import UploadWidget from '../../components/uploadWidget/UploadWidget'

function ProfileUpdatePage() {
  const { updateUser, currentUser } = useContext(AuthContext)
  const [error, setError] = useState('')
  const [avatar, setAvatar] = useState([])

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const { username, email, password } = Object.fromEntries(formData)

    try {
      const res = await apiRequest.put(`/user/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      })
      updateUser(res.data)
      navigate('/profile')
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              defaultValue={currentUser.username}
              id="username"
              name="username"
              type="text"
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              defaultValue={currentUser.email}
              id="email"
              name="email"
              type="email"
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
        </form>
        {error ?? <span>{error}</span>}
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || currentUser.avatar || '/noavatar.jpg'}
          alt=""
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: 'dfaa3kwat',
            uploadPreset: 'estate',
            multiple: false,
            maxImageFileSize: 2000000,
            folder: 'avatars',
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  )
}

export default ProfileUpdatePage
