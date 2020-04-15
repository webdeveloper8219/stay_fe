import React, { Component } from "react";
import defaultBcg from "../../Common/dataImages/room-1.jpeg";
import StyledHero from "../Common/StyledHero";
import Banner from "../Common/Banner";
import { A } from "hookrouter";
import { RoomContext } from "../Context/context";

export default class SingleRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: this.props.slug,
      defaultBcg: defaultBcg
    };
  }
  static contextType = RoomContext;


  // componentDidMount() {
  //   console.log(this.props);
  // }
  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);


    if (!room) {
      return (
        <div className="error">
          <h3> no such room could be found...</h3>
          <A href="/rooms" className="btn-primary">
            back to rooms
          </A>
        </div>
      );
    }
    const {
      id,
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images,
      hotname
    } = room;

    const [main, ...defaultImages] = images;


    return (
      <>
        <StyledHero img={images[0] || this.state.defaultBcg}>
          <Banner title={`${name} room`}>
            <A href="/rooms" className="btn-primary">
              back to rooms
            </A>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImages.map((item, index) => (
              <img key={index} src={item} alt={name} />
            ))}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price : Rs {price}</h6>
              <h6>size : {size} SQFT</h6>
              <h6>
                max capacity :
                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
              </h6>
              <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
              <h6>{breakfast && "free breakfast included"}</h6>
              <A href={`/rooms/book/${id}`} className="btn-primary">
                BOOK
            </A>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>extras </h6>
          <ul className="extras">
            {extras.map((item, index) => (
              <li key={index}>- {item}</li>
            ))}
          </ul>
        </section>
      </>
    );
  }
}