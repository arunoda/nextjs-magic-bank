import { useState, useEffect } from 'react';
import useMagicLink from 'use-magic-link'

export default function BankStatement() {
    const auth = useMagicLink('pk_live_BC6053B47934BA52');
    const [statement, setStatement] = useState(null);

    useEffect(() => {
        if (auth.loggedIn) {
            auth.fetch('/api/statement')
                .then(res => res.json())
                .then((payload) => {
                    setStatement(payload);
                })
        }
    }, [auth.loggedIn])

    if (!auth.loggedIn) {
        return (<div>Not Authorized!</div>)
    }

    if (statement === null) {
        return (<div>Checking your statement ...</div>)
    }

    return (
        <div>
            Hello "{statement.email}", your balance is <b>${statement.balance}</b>.
        </div>
    )
}