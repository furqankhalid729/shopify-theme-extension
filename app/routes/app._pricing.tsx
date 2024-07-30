import React from 'react';
import { Card, Layout, Page, TextContainer } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';

interface PlanCardProps {
    planName: string;
    price: string;
    features: string[];
  }
  
  const PlanCard: React.FC<PlanCardProps> = ({ planName, price, features }) => {
    return (
        <Card>
        <TextContainer>
          <p className="price">{price}</p>
          <ul className="features">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </TextContainer>
      </Card>
    );
  };
  
  interface Plan {
    name: string;
    price: string;
    features: string[];
  }
  
const Pricing: React.FC = () => {
    const plans: Plan[] = [
      {
        name: 'Free',
        price: '$0',
        features: ['Feature 1', 'Feature 2', 'Feature 3']
      },
      {
        name: 'Hobby',
        price: '$10/month',
        features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4']
      },
      {
        name: 'Standard',
        price: '$30/month',
        features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5']
      },
      {
        name: 'Unlimited',
        price: '$50/month',
        features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5', 'Feature 6']
      }
    ];
  
    return (
        <Page title="Our Plans">
          <Layout>
            {plans.map((plan, index) => (
              <Layout.Section >
                <PlanCard
                  planName={plan.name}
                  price={plan.price}
                  features={plan.features}
                />
              </Layout.Section>
            ))}
          </Layout>
        </Page>
      );
  };
  
export default Pricing;
