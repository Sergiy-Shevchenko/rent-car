import React, { useEffect, useState } from 'react';
import { CarItem } from 'components/CarItem/CarItem';

import { useSelector } from 'react-redux';
import { fethcAllCars } from 'components/Api/Api';
import { selectIsLoading, selectError} from 'redux/selector';
import css from './Carlist.module.css';

export const CarList = () => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [allCars, setAllCars] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fethcAllCars(page)
      .then(data => {
        if (data) {
          setAllCars(prev => [...prev, ...data]);
        }
      })
      .catch(error => console.log(error.message));
  }, [page]);

  const addCard = () => {
    setPage(prev => prev + 1);
  };



  return (
    <div className={css.container}>
      <ul className={css.carList}>
        {isLoading && <p>Loading tasks...</p>}
        {error && <p>{error}</p>}
        {allCars.map(
          ({
            id,
            make,
            model,
            img,
            year,
            rentalPrice,
            address,
            rentalCompany,
            type,
            accessories,
            fuelConsumption,
            engineSize,
            description,
            functionalities,
            rentalConditions,
            mileage,
          }) => (
            <CarItem
              id={id}
              make={make}
              model={model}
              key={id}
              img={img}
              year={year}
              rentalPrice={rentalPrice}
              address={address}
              rentalCompany={rentalCompany}
              type={type}
              accessories={accessories}
              fuelConsumption={fuelConsumption}
              engineSize={engineSize}
              description={description}
              functionalities={functionalities}
              rentalConditions={rentalConditions}
              mileage={mileage}
            />
          )
        )}
      </ul>
      <button className={css.button} onClick={addCard}>
        Load more
      </button>
    </div>
  );
};
