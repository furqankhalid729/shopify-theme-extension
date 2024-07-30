import React from 'react';
import { Card, Layout, Page, TextContainer,Button  } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate, Free,Hobby } from "../shopify.server";
import { AppProvider } from "@shopify/shopify-app-remix/react";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { billing } = await authenticate.admin(request);
  await billing.require({
    plans: [Hobby],
    isTest: true,
    onFailure: async () => billing.request({ plan: Hobby }),
  });
  const { hasActivePayment, appSubscriptions } = await billing.check({
    plans: [Free],
    isTest: false,
  });
 console.log(hasActivePayment)
 console.log(appSubscriptions)
 return json({ hasActivePayment, appSubscriptions });
};

interface PlanCardProps {
    planName: string;
    price: string;
    features: string[];
    onSelect: () => void;
}
  
const PlanCard: React.FC<PlanCardProps> = ({ planName, price, features,onSelect }) => {
    return (
        <Card>
        <h2 style={{fontSize:"20px",fontWeight:"bold",marginBottom:"10px"}}>{planName}</h2>
        <TextContainer>
          <p className="price">{price}</p>
          <ul className="features">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <Button onClick={onSelect}  variant="primary" >Select Plan</Button>
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
    const bill = useLoaderData();
    const plans: Plan[] = [
      {
        name: 'Free',
        price: '$0',
        features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5']
      },
      {
        name: 'Hobby',
        price: '$14.99/month',
        features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5']
      },
      {
        name: 'Standard',
        price: '$49/month',
        features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5']
      },
      {
        name: 'Unlimited',
        price: '$349/month',
        features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5']
      }
    ];

    const handleSelectPlan = (planName: string) => {
      console.log(bill)
      alert(`You selected the ${planName} plan`);
    };
  
    return (
        <Page title="Our Plans">
          <Layout>
            <div style={{display:"flex",gap:"20px",justifyContent: 'space-around', flexWrap: 'wrap'}}>
              {plans.map((plan, index) => (
                <div key={index} style={{ flex: '0 1 21%', minWidth: '210px' }}>
                  <PlanCard
                    planName={plan.name}
                    price={plan.price}
                    features={plan.features}
                    onSelect={() => handleSelectPlan(plan.name)}
                  />
                </div>
              ))}
            </div>
          </Layout>
        </Page>
    );
};
  
export default Pricing;
