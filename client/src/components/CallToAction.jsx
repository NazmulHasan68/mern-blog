import { Button } from 'flowbite-react'
import actionImage from '../assets/action.jpg'
function CallToAction() {
  return (
    <div className='flex flex-col gap-5 sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex-1 py-12 md:py-0'>
            <h2>I want to see more supper bike</h2>
            <p>Checkout these resourse with 100 bike</p>
            <Button gradientDuoTone='greenToBlue' className='w-full '>
                <a href='https://www.100jsprojects.com' target='_blank' rel='noopener noreferrer'>show for more bike click me</a>
            </Button>
        </div>
        <div className='flex-1'>
            <img src={actionImage} alt='image '/>
        </div>
    </div>
  )
}

export default CallToAction
