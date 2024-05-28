import Cookies from 'js-cookie'
import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoLocation} from 'react-icons/io5'
import {FiExternalLink} from 'react-icons/fi'
import SkillCard from '../SkillCard'
import './index.css'

const apiConstantsStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    isJobDetails: apiConstantsStatus.initial,
    jobsDetails: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  updatedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    description: data.life_at_company.description,
    imageUrl: data.life_at_company.image_url,

    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
    title: data.title,
  })

  updatedSimilarJobs = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobsItemUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobsItemUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = this.updatedData(data.job_details)
      const updatedSimilarData = data.similar_jobs.map(eachSimilarJobs =>
        this.updatedSimilarJobs(eachSimilarJobs),
      )
      this.setState({jobsDetails: updatedData, similarJobs: updatedSimilarData})
      //   console.log(updatedData)
      //   console.log(updatedSimilarData)
    }
  }

  renderSuccessFulJobsView = () => {
    const {jobsDetails, similarJobs} = this.state
    const skillsData = jobsDetails.skills
    console.log(skillsData)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      description,
      imageUrl,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
    } = jobsDetails
    // const {description, imageUrl} = lifeAtCompany
    // console.log(skills)
    // const {imageUrl, name} = skills
    skills.map(eachSkill => console.log(eachSkill))
    return (
      <div className="jobs-item-details-container">
        <div className="job-details-mini-container">
          <div className="job-details-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="jobDetails-company-logo"
            />
            <div className="job-details-rating-jobType-container">
              <h1 className="job-details-employment">{title}</h1>
              <div className="job-details-rating-container">
                <FaStar className="rating-star-img" />
                <p className="jobs-details-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-locationAndPackage-container">
            <div className="job-details-locationAndJob-container">
              <div className="job-details-location-container">
                <IoLocation className="job-details-location-icon " />
                <p className="job-details-location">{location}</p>
              </div>
              <div className="job-details-briefcase-container">
                <BsBriefcaseFill className="job-details-briefcase-icon" />
                <p className="job-details-jobType">{employmentType}</p>
              </div>
            </div>
            <p className="job-details-package-amount">{packagePerAnnum}</p>
          </div>
          <hr />
          <div>
            <div className="description-website-container">
              <h1 className="job-details-description-heading">Description</h1>
              <a href={companyWebsiteUrl} className="external-link-icon">
                Visit
                <FiExternalLink size={20} />
              </a>
            </div>
            <p className="job-details-description">{jobDescription}</p>
          </div>
          <h1 className="skills-heading">Skills</h1>
        </div>
      </div>
    )
  }

  renderLoadingJobsView = () => {}

  renderFailureJobsView = () => {}

  render() {
    return <div>{this.renderSuccessFulJobsView()}</div>
  }
}

export default JobItemDetails
