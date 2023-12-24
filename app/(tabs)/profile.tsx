import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo';
import { Link } from 'expo-router';

const Page = () => {
  const { signOut, isSignedIn } = useAuth();

  const onHandleLogout = () => {
    signOut();
    console.log("🚀 SIGN OUT ~ file: profile.tsx:10 ~ onHandleLogout ~ signOut:", isSignedIn)

  }

  return (
    <View>
      <Button title='Log out' onPress={() => onHandleLogout()} />
      <View>
        <Text style={{ textAlign: 'center'}}>Profile page</Text>
      </View>
      { !isSignedIn && (
        <Link href={'/(modals)/login'}>
          <Text style={{ textAlign: 'center'}}>Login</Text>
        </Link>
      )}
    </View>
  )
}

export default Page