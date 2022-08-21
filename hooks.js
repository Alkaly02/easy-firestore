import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

// get All Docs
function useDocs(db, collectionName) {
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [numberOfData, setNumberOfData] = useState(0);

  useEffect(() => {
    const getDocs = async () => {
      onSnapshot(collection(db, collectionName), (querySnapshot) => {
        setNumberOfData(querySnapshot.size);
        const allData = [];
        querySnapshot.forEach((doc) => {
          allData.push({ ...doc.data(), id: doc.id });
        });
        setData([...allData]);
        setDataLoading(false);
      });
    };
    getDocs();
  }, []);

  return { data, numberOfData, dataLoading };
}

// get Docs With Where()
const useWhereDocs = (
  db,
  collectionName,
  whereToLookInTheCollection,
  whereToLookValue
) => {
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [numberOfData, setNumberOfData] = useState(0);

  useEffect(() => {
    const getWhereDocs = async () => {
      if (!whereToLookValue) return;
      const q = query(
        collection(db, collectionName),
        where(whereToLookInTheCollection, "==", whereToLookValue)
      );
      onSnapshot(q, (querySnapshot) => {
        setNumberOfData(querySnapshot.size);
        const allData = [];
        querySnapshot.forEach((doc) => {
          allData.push({ ...doc.data(), id: doc.id });
        });
        setData([...allData]);
        setDataLoading(false);
      });
    };
    getWhereDocs();
  }, [whereToLookValue]);

  return { data, numberOfData, dataLoading };
};

// get image url
const useFile = (storage, file) => {
    const [percentage, setPercentage] = useState(null);
    const [imgUrl, setImgUrl] = useState('')
    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;

            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setPercentage(progress);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImgUrl(downloadURL)
                    });
                }
            );
        };
        file && uploadFile();
    }, [file]);

    return {imgUrl, setImgUrl, percentage}
}


export { useDocs, useWhereDocs, useFile };
