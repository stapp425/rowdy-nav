import { useEffect, useState } from "react"
import { firestore } from "firebaseConfig"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, Query, QuerySnapshot, updateDoc } from "firebase/firestore"
import { Obj } from "../types/app.js"

export function useFirestoreGet<T>(path: string, id: string, initialData: T) {
  const [data, setData] = useState<T>(initialData)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  useEffect(() => {
    getFirestoreDoc()

    async function getFirestoreDoc() {
      try {
        setIsLoading(true)
        await getDoc(doc(firestore, path, id))
      } catch(err: any) {
        console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
  }, [])

	return { data, setData, isLoading, setIsLoading}
}

export function useFirestoreFetch<T extends Obj>(query: Query, options: { initialData: T[], defaultData: T[] }  ) {
  const [data, setData] = useState<T[]>(options.initialData)
  const [isFetching, setIsFetching] = useState<boolean>(true)

  useEffect(() => {
    fetchData()
    
    async function fetchData() {
      try {
        setIsFetching(true)
        const data: QuerySnapshot = await getDocs(query)
        const dataSnapshot = data.docs.map(doc => ({ ...doc.data(), id: doc.id } as unknown as T))
        setData(dataSnapshot)
      } catch(err: any) {
        console.error(err.message)
      } finally {
        setIsFetching(false)
      }
    }
  }, [])
  
  return { data, setData, isFetching }
}

export function useFirestoreUpdate<T extends Obj>() {
  const [isWorking, setIsWorking] = useState<boolean>(false)

  async function updateFirestoreDoc(path: string, id: string, data: T) {
    try {
      setIsWorking(true)
      await updateDoc(doc(firestore, path, id), data)
      alert("Document successfully updated!")
    } catch(err: any) {
      console.error(err.message)
    } finally {
      setIsWorking(false)
    }
  }

  return { isWorking, updateFirestoreDoc }
}

export function useFirestorePost<T extends Obj>() {
  const [isWorking, setIsWorking] = useState<boolean>(false)

  async function addFirestoreDoc(path: string, data: T) {
    try {
      setIsWorking(true)
      await addDoc(collection(firestore, path), data)
      alert("Document successfully added!")
    } catch(err: any) {
      console.error(err.message)
    } finally {
      setIsWorking(false)
    }
  }
  
  return { isWorking, setIsWorking, addFirestoreDoc }
}

export const useFirestoreDelete = () => {
  const [isWorking, setIsWorking] = useState<boolean>(false)

  async function deleteFirestoreDoc(path: string, id: string) {
    try {
      setIsWorking(true)
      await deleteDoc(doc(firestore, path, id))
      alert("Document successfully deleted!")
    } catch(err: any) {
      console.error(err.message)
    } finally {
      setIsWorking(false)
    }
  }

  return { isWorking, deleteFirestoreDoc }
}