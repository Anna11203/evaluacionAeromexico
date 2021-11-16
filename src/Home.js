import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ModalAdd from "./components/modalAdd";
import RenderCard from "./components/renderCard";
import logoHP from './img/logo.svg';
import add from './img/User_fill_add.png';
import fav from './img/Rectangle 3.png';

const isStudent = "student";

const Home = (props) => {
  const {
    changeState,
    characters,
    showCharacters,
    showStudents,
    students,
    filterStudent,
    staff,
    filterStaff,
    showStaff,
    favorites,
    changeStateFav,
    changeStateFavDelete
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    if (!isRefresh) {
      getData();
      setIsRefresh(true);
    }
  }, []);

  const getData = async () => {
    await axios.get('http://localhost:5000/characters')
      .then(res => {
        changeState(res.data);
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const favorite = (item) => {
    const filter = favorites.filter((element) => element.id === item.id);

    if (filter.length === 0 && favorites.length <= 5) {
      changeStateFav(item)
    }

    if (filter.length === 1 && favorites.length <= 5) {
      const index = favorites.indexOf(item);
      if (index !== -1) {
        let newData = favorites.filter((element) => element.id !== item.id);
        changeStateFavDelete(newData)
      }
    }
  }

  const renderItem = (item) => {
    const isFav = favorites.filter((element) => element.id === item.id);
    return (
      <RenderCard
        key={item.name}
        item={item}
        actionFav={favorite}
        isFav={isFav.length > 0}
      />
    )
  }

  const dataForm = async (data) => {

    await axios.post('http://localhost:5000/characters', {
      id: characters.length + 1,
      name: data.name,
      species: "human",
      gender: data.gender,
      house: "Gryffindor",
      dateOfBirth: data.birthday,
      yearOfBirth: 1980,
      ancestry: "half-blood",
      eyeColour: data.eyecolor,
      hairColour: data.eyehair,
      wand: {
        wood: "holly",
        core: "phoenix feather",
        length: 11
      },
      patronus: "stag",
      hogwartsStudent: data.position === isStudent,
      hogwartsStaff: !(data.position === isStudent),
      actor: "",
      alive: true,
      image: data.image
    })
      .then(res => {
        getData();
        setShowModal(false);
      })
      .catch(error => {
        console.log('error', error)
      })
  }


  const getStudent = async () => {
    const filterStudentData = characters.filter((item) => item.hogwartsStudent);
    await filterStudent(filterStudentData);
  }

  const getStaff = async () => {
    const filterStaffData = characters.filter((item) => item.hogwartsStaff);
    await filterStaff(filterStaffData);
  }

  const colorEstudent = showStudents ? "buttons-style button-active" : "buttons-style button-normal";
  const colorStaff = showStaff ? "buttons-style button-active" : "buttons-style button-normal";

  return (
    <div className="body">
      <div className="pin-favorites">
        <div className="pin-option-fav">FAVORITOS<img src={fav} width={11} height={11} style={{ marginLeft: 5 }}></img></div>
        <div className="pin-option-add" onClick={() => setShowModal(!showModal)}>
          AGREGAR<img src={add} width={13} height={13} style={{ marginLeft: 5 }}></img>
        </div>
      </div>
      <img src={logoHP} width={200} height={100}></img>
      <p className="text-filter">Selecciona tu filtro</p>
      <div className="buttons">
        <span className={colorEstudent} style={{ marginRight: '10%' }} onClick={() => getStudent()}>ESTUDIANTES</span>
        <span className={colorStaff} onClick={() => getStaff()}>STAFF</span>
      </div>
      <div className="contenedor">
        {showCharacters && characters.map((item) => renderItem(item))}
        {showStudents && students.map((item) => renderItem(item))}
        {showStaff && staff.map((item) => renderItem(item))}
      </div>

      <ModalAdd
        visible={showModal}
        toogle={() => setShowModal(!showModal)}
        actionData={dataForm}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  characters: state.characters,
  students: state.students,
  staff: state.staff,
  favorites: state.favorites,
  showCharacters: state.showCharacters,
  showStudents: state.showStudents,
  showStaff: state.showStaff
})

const mapDispatchToProps = dispatch => ({
  changeState(data) {
    dispatch({
      type: "characters",
      data
    })
  },
  filterStudent(data) {
    dispatch({
      type: "filterStudents",
      data
    })
  },
  filterStaff(data) {
    dispatch({
      type: "filterStaff",
      data
    })
  },
  changeStateFav(data) {
    dispatch({
      type: "favoritesAdd",
      data
    })
  },
  changeStateFavDelete(data) {
    dispatch({
      type: "favoritesDelete",
      data
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);