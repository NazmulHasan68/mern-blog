import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from '../firebase';
import { useDispatch} from 'react-redux';
import {signInsuccess} from '../redux/userSlice/userSlice'
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async () => {  // Marked as async
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });  // Fixed typo
        
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            console.log(resultsFromGoogle);
            const res = await fetch(`/api/auth/google`,{
                method : 'POST',
                headers : {'Content-Type': 'application/json'},
                body:JSON.stringify({
                    name : resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoURL : resultsFromGoogle.user.photoURL
                })
            })
            const data = await res.json();
            if(res.ok){
                dispatch(signInsuccess(data))
                navigate('/')
            }   
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    };

    return (
        <Button type="button" gradientDuoTone="greenToBlue" outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle size={22} className="mx-2 " />
            Continue with Google
        </Button>
    );
}
