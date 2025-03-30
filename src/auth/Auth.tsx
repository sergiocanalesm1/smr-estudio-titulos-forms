
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient(
    `https://${import.meta.env.VITE_SB_PROJECT_URL}.supabase.co`, 
    import.meta.env.VITE_SB_KEY
);

interface AuthProps {
    component: React.ReactNode
}

const AuthComponent: React.FC<AuthProps> = ({ component }) => {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (!session) {
        return (
            <Auth 
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }} 
                showLinks={false}
                view='sign_in'
            />)
    }
    else {
        return component;
    }
}

export default AuthComponent;