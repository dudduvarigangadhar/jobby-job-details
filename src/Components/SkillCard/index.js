import './index.css'

const SkillCard = props => {
  const {eachSkill} = props
  return (
    <div>
      <img src={eachSkill.imageUrl} alt="skill" className="skill-img" />
      <p>{eachSkill.name}</p>
    </div>
  )
}

export default SkillCard
