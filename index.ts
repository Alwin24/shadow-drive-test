import anchor from '@project-serum/anchor'
import { Connection, clusterApiUrl, Keypair, PublicKey } from '@solana/web3.js'
import { ShdwDrive, ShadowFile } from '@shadow-drive/sdk'
import { readFileSync } from 'fs'

const main = async () => {
	let secretKey = Uint8Array.from(JSON.parse(readFileSync('/home/alwin/second-wallet/second-keypair.json', 'utf8')))
	let keypair = Keypair.fromSecretKey(secretKey)

	console.log('Public Key :', keypair.publicKey.toBase58())
	const connection = new Connection(
		'https://alpha-dimensional-firefly.solana-mainnet.discover.quiknode.pro/',
		'processed'
	)
	const wallet = new anchor.Wallet(keypair)
	const drive = await new ShdwDrive(connection, wallet).init()

	// // Create a new storage account
	// const newAcct = await drive.createStorageAccount('myDemoBucket', '10KB', 'v2')
	// console.log(newAcct)

	// // Get storage account
	// const accts = await drive.getStorageAccounts('v2')
	// // handle printing pubKey of first storage acct
	// let acctPubKey = new anchor.web3.PublicKey(accts[0].publicKey)
	// console.log('Account :',acctPubKey.toBase58())

	// Upload file
	const fileBuff = readFileSync('./metadata.json')
	const acctPubKey = new PublicKey('6o5gmThbudBoNWB2Z35cJ3xX3CyETy5V6xEoBSbAhNzB')
	const fileToUpload: ShadowFile = {
		name: 'metadata.json',
		file: fileBuff,
	}
	const uploadFile = await drive.uploadFile(acctPubKey, fileToUpload)
	console.log(uploadFile)
}

main()
