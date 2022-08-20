import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

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
          setData([...allData]);
        });
        setDataLoading(false);
      });
    };
    getDocs();
  }, []);

  return { data, numberOfData, dataLoading };
}

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
      if (!whereToLook) return;
      const q = query(
        collection(db, collectionName),
        where(whereToLookInTheCollection, "==", whereToLookValue)
      );
      onSnapshot(q, (querySnapshot) => {
        setNumberOfData(querySnapshot.size);
        const allData = [];
        querySnapshot.forEach((doc) => {
          allData.push({ ...doc.data(), id: doc.id });
          setData([...allData]);
        });
        setDataLoading(false);
      });
    };
    getWhereDocs();
  }, [whereToLookValue]);

  return { data, numberOfData, dataLoading };
};

export { useDocs, useWhereDocs };
