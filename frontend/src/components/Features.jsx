function Features() {

    const features = [

        {
            icon:"💬",
            title:"AI Chat",
            text:"Ask Agael AI anything."
        },

        {
            icon:"🎨",
            title:"AI Images",
            text:"Generate beautiful AI artwork."
        },

        {
            icon:"📄",
            title:"PDF Assistant",
            text:"Summarize and understand PDFs."
        },

        {
            icon:"🎓",
            title:"KCSE Tutor",
            text:"Study smarter with AI."
        },

        {
            icon:"💻",
            title:"Code Assistant",
            text:"Write and debug code."
        },

        {
            icon:"🎤",
            title:"Voice AI",
            text:"Talk naturally with Agael AI."
        }

    ];

    return(

        <section className="features">

            {features.map((feature,index)=>(

                <div className="card" key={index}>

                    <h1>{feature.icon}</h1>

                    <h2>{feature.title}</h2>

                    <p>{feature.text}</p>

                </div>

            ))}

        </section>

    )

}

export default Features;