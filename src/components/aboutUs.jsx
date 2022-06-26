
import '../assets/css/aboutUsStyle.css'

export default () => {

    const informationsList = [
        {
            q: "What are some random questions to ask?",
            a: "That's exactly the reason we created this random question generator. There are hundreds of random questions to choose from so you're able to find the perfect random question."
        },
        {
            q: "Do you include common questions?",
            a: "This generator doesn't include most common questions. The thought is that you can come up with common questions on your own so most of the questions in this generator."
        },
        {
            q: "Can I use this for 21 questions?",
            a: "Yes! there are two ways that you can use this question generator depending on what you're after. You can indicate that you want 21 questions generated."
        },
        {
            q: "Are these questions for girls or for boys?",
            a: "The questions in this generator are gender neutral and can be used to ask either male of females (or any other gender the person identifies with)."
        }
    ]

    return (
        <div className="faqs-shadow">
            <div className="faqs-header">
                <h1>
                    About Us
                </h1>

            </div>
            <div className="faqs-container" style={{boxShadow: '0px 7px 20px 7px #F1F1F1'}}>
                <div className="faqs">
                    {
                        informationsList.map((item, idx) => (
                            <div className="faqs-card" key={idx}>
                                <h4>
                                    {item.q}
                                </h4>
                                <p>
                                    {item.a}
                                </p>
                            </div>
                        ))
                    }
                </div>
                <span className="vertical-line"></span>
            </div>
        </div>
    )
}