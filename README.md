# Synapse

Synapse is an interactive DNA-to-protein learning simulator. It demonstrates how genetic information moves from DNA to RNA and then to a chain of amino acids.

## Features

- DNA sequence validation for A, T, G, and C
- Complementary-strand replication
- DNA transcription into mRNA
- Codon grouping and amino-acid translation
- Start codon detection using AUG
- Stop codon detection using UAA, UAG, and UGA
- Asynchronous staged processing with visible progress updates
- Replication, transcription, and translation educational videos
- Videos that play only when scrolled into view
- Responsive desktop and mobile layout
- Translucent liquid-glass visual design
- Firebase Google Authentication
- Email-based demo authentication
- Contact links for email, Instagram, LinkedIn, and GitHub

## How It Works

1. Enter a DNA sequence in the simulator.
2. Click **Run simulation**.
3. Synapse generates the complementary DNA strand.
4. The DNA sequence is transcribed into mRNA.
5. The mRNA is divided into codons.
6. Translation begins at the first AUG start codon and stops at a stop codon.

The application processes these stages in order. Transcription waits for replication to complete, and translation waits for the mRNA result.

## Run Locally

Because Firebase Authentication does not work reliably from a `file://` URL, run the project through a local web server.

With Python:

```bash
python3 -m http.server 5500
```

Open the application at:

```text
http://localhost:5500/index.html
```

You can also use the Live Server extension in VS Code.

## Firebase Authentication

The project uses Firebase Authentication for Google sign-in.

Before testing authentication:

1. Open the Firebase Console.
2. Select the Synapse project.
3. Open **Authentication**.
4. Enable the **Google** sign-in provider.
5. Add `localhost` and your Vercel domain under **Authorized domains**.
6. Confirm that the Firebase configuration in `index.html` belongs to the same project.

The Firebase web configuration is intended for frontend use. Never place service-account private keys or other server secrets in `index.html`.

## Deploy With Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Use the project root as the deployment directory.
4. Deploy without a build command because this is a static HTML project.
5. Add the deployed Vercel domain to Firebase Authentication authorized domains.

After deployment, open the Vercel URL instead of opening `index.html` directly from the filesystem.

## Project Structure

```text
Synapse/
├── index.html
├── about.txt
├── README.md
├── dna.mp4
├── replicatin.mov
├── transcription.mov
├── translati.mov
└── synapse.js
```

## Educational Scope

Synapse is designed for educational visualization. It explains the basic central dogma of molecular biology and is not a medical, diagnostic, or laboratory tool.

## Contact

- Email: imtiazsarkar863@gmail.com
- Instagram: https://www.instagram.com/_iamtheeog_/
- LinkedIn: https://www.linkedin.com/in/imtiaz-sarkar-965538385/
- GitHub: https://github.com/imtiazsarkar863
