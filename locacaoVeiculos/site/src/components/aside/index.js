import './index.scss';

export default function Aside() {
    return(
        <div className='comp-aside'>
            <main>
                <section className='logo'>
                    <img src='/assets/images/roda.png' alt='roda'/>
                    <img src='/assets/images/text.png' alt='text' />
                </section>
                <section className='nav'>
                    <article>
                        <img src='/assets/images/icon-house.svg' alt='house'/>
                        <div>
                            <h6> Home </h6>                     
                        </div>   
                    </article>
                    <article>
                        <img src='/assets/images/icon-body.png' alt='body'/>   
                        <div>
                            <h6> Clientes </h6>                     
                        </div>                    
                    </article>
                    <article>
                        <img src='/assets/images/icon-car.png' alt='car'/>   
                        <div>
                            <h6> Veículos </h6>                     
                        </div>                    
                    </article>
                    <article>
                        <img src='/assets/images/icon-key.png' alt='key'/>   
                        <div>
                            <h6> Locação </h6>                     
                        </div>                    
                    </article>
                </section>
            </main>
            <section></section>
        </div>
    )
}