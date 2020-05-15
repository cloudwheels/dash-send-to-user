# Send Dash to User
An expiriment with sending and receiving dash to a publickey hash associated with a registered user name.

## Installation
```
git clone https://github.com/cloudwheels/dash-send-to-user && cd  dash-send-to-user
npm i
```

## Usage

### 1) Test Accounts 

Create test accounts for the sender and receiver.

sender
```
swap funny purpose quiz wise device notable address sibling snap install chuckle
2MyqnDofEQE2YAJcXQxQvJ1MtahnsZPccPZsB6dXETDD

```

receiver
```
forest gas fit bulb version fossil plunge panther employ buyer hunt era
ERYveb8TCbe1msWG7RgPidKUrPgjSX6UGA9hzqszsygU
```

### 2) The sender's address

This is the public key hash address derived from the public key for the identity associated with the DPNS registration of the sender's name. Sending from this address will allow the receiver to determine that the payment was sent by this identity, and therefore a name (or at least one of the names registered for this identity)



