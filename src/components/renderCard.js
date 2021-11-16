import FavOut from '../img/Rectangle 1.png';
import FavDar from '../img/Rectangle 2.png';

const RenderCard = (props) => {

  const {
    hogwartsStudent,
    alive,
    house,
    image,
    name,
    dateOfBirth,
    gender,
    eyeColour,
    hairColour
  } = props.item;

  const gryffindor = "Gryffindor";
  const slytherin = "Slytherin";
  const ravenclaw = "Ravenclaw";
  const hufflepuff = "Hufflepuff";

  const isStudent = hogwartsStudent ? "ESTUDIANTE" : "STAFF";
  const isLive = alive ? "VIVO" : "FINADO";
  let houseSelect;

  if (house === gryffindor) {
    houseSelect = "image-avatar background-Gryffindor";
  }
  else if (house === slytherin) {
    houseSelect = "image-avatar background-Slytherin";
  }
  else if (house === ravenclaw) {
    houseSelect = "image-avatar background-Ravenclaw";
  }
  else {
    houseSelect = "image-avatar background-Hufflepuff";
  }

  const sendFav = (data) => {
    props.actionFav(data)
  }

  return (
    <div className="item-render">
      <div className={houseSelect}>
        <img src={image} width={70} height={70} style={{ borderRadius: '50%' }}></img>
      </div>
      <div className="info-description">
        <span className="live">
          {isLive + " / " + isStudent}
          <img
            onClick={() => sendFav(props.item)}
            src={props.isFav ? FavDar : FavOut}
            width={13}
            height={13}
            style={{ marginRight: 15 }}>
          </img>
        </span>
        <span className="name">{name}</span>
        <span className="dates"><strong>Cumpleaños:</strong> {dateOfBirth}</span>
        <span className="dates"><strong>Género:</strong> {gender}</span>
        <span className="dates"><strong>Color de ojos:</strong> {eyeColour}</span>
        <span className="dates"><strong>Color de pelo:</strong> {hairColour}</span>
      </div>
    </div>
  )
}

export default RenderCard;