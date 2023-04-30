import './section.css'
const Section = ({title, children}) => {
  return (
    <section className='section__container'>
         <h2 className='section__title'>{title}</h2>
         {children}
    </section>
  )
}

export default Section