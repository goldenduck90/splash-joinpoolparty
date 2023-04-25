import type { ListItemProps } from '@mui/material';
import { Button, ListItem } from '@mui/material';
import type { Wallet } from '@solana/wallet-adapter-react';
import type { FC, MouseEventHandler } from 'react';
import React from 'react';
import { WalletIcon } from './WalletIcon';

interface WalletListItemProps extends Omit<ListItemProps, 'onClick' | 'button'> {
    onClick: MouseEventHandler<HTMLButtonElement>;
    wallet: Wallet;
}

export const WalletListItem: FC<WalletListItemProps> = ({ onClick, wallet, ...props }) => {
    return (
        <ListItem {...props} style={{width: '100%'}}>
            <Button onClick={onClick} 
                startIcon={<WalletIcon style={{width: '40px', height: '40px'}} wallet={wallet} />}  
                style={{
                    width: '100%', 
                    border: '3px solid #FFFFFF', 
                    borderRadius: '12px', 
                    background: '#4D41DB', 
                    fontSize: '24px', 
                    textTransform: 'none', 
                    color: '#FFF',
                    justifyContent: 'flex-start',
                    paddingLeft: 0,
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '10px 100px 10px 24px',
                    gap: '10px'
                }}>
                {wallet.adapter.name}
            </Button>
        </ListItem>
    );
};