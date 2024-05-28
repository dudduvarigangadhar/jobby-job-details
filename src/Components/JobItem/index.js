import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoLocation} from 'react-icons/io5'
import './index.css'

const JobItem = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob
  return (
    <Link to={`/jobs/${id}`} className="container">
      <div className="each-jobs-container">
        <div className="company-logo-container">
          <img src={companyLogoUrl} alt={title} className="company-logo" />
          <div className="title-and-rating">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <FaStar className="rating-star-img" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="locationAndPackage-container">
          <div className="locationAndJob-container">
            <div className="location-container">
              <IoLocation className="location-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="briefcase-container">
              <BsBriefcaseFill className="briefcase-icon" />
              <p className="jobType">{employmentType}</p>
            </div>
          </div>
          <p className="package-amount">{packagePerAnnum}</p>
        </div>
        <hr />
        <p className="description-heading">Description</p>
        <p className="job-description">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobItem
