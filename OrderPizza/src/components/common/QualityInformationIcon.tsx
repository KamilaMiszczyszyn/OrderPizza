import styled from "styled-components"
import indgredientsIcon from "./../../assets/Ingredients.svg"
import recipeIcon from "./../../assets/Recipe.svg"
import deliveryIcon from "./../../assets/Scooter.svg"

interface ComponentProps {
    ingredients?: boolean;
    recipe?: boolean;
    delivery?: boolean;
    variant2?: boolean;
}


const BorderRed= styled.div`
    width: 180px;
    height: 180px;
    border-left: 4px solid ${props=> props.theme.colors.primary[500]};
    border-bottom: 4px solid ${props=> props.theme.colors.primary[500]};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const BorderBlack = styled.div`
    width: 160px;
    height: 160px;
    border-right: 1px solid ${props=> props.theme.colors.neutral[900]};
    border-top: 1px solid ${props=> props.theme.colors.neutral[900]};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

`

const BorderRedVariant2 = styled.div`
    width: 180px;
    height: 180px;
    border-right: 4px solid ${props=> props.theme.colors.primary[500]};
    border-top: 4px solid ${props=> props.theme.colors.primary[500]};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const BorderBlackVariant2=styled.div`
    width: 160px;
    height: 160px;
    border-left: 1px solid ${props=> props.theme.colors.neutral[900]};
    border-bottom: 1px solid ${props=> props.theme.colors.neutral[900]};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`



const QualityInformationIcon = ({ingredients = false, recipe = false, delivery = false, variant2 = false}: ComponentProps) => {

  return (
    <>
      {!variant2 && 
        <BorderRed>
            <BorderBlack>
                {ingredients && <img src={indgredientsIcon} alt=""/>}
                {recipe && <img src={recipeIcon} alt=""/>}
                {delivery && <img src={deliveryIcon} alt=""/>}
            </BorderBlack>
        </BorderRed>}

    {variant2 && 
        <BorderRedVariant2>
            <BorderBlackVariant2>
                {ingredients && <img src={indgredientsIcon} alt=""/>}
                {recipe && <img src={recipeIcon} alt=""/>}
                {delivery && <img src={deliveryIcon} alt=""/>}
            </BorderBlackVariant2>
        </BorderRedVariant2>
    }
     </>
  )
   
  
}

export default QualityInformationIcon